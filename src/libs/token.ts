import type { Context } from 'koa';
import type { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Token from '../entities/Token';
import User from '../entities/User';

export type TokenType = {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
};

export type AccessTokenType = {
  user_id: string;
  username: string;
  admin: boolean;
} & TokenType;

export type RefreshTokenType = {
  user_id: string;
  username: string;
  admin: boolean;
  token_id: string;
} & TokenType;

export const generateToken = async (
  payload: any,
  options?: SignOptions
): Promise<string> => {
  const secretKey = process.env.JWT_SECRET!;
  const jwtOptions: SignOptions = {
    issuer: 'paysys.kr',
    expiresIn: '15d',
    ...options,
  };

  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }

  return new Promise((resolve, reject) => {
    if (!secretKey) return;

    jwt.sign(payload, secretKey, jwtOptions, (err, token) => {
      if (err || token === undefined) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export const decodeToken = async <T = any>(token: string): Promise<T> => {
  const secretKey = process.env.JWT_SECRET!;

  return new Promise((resolve, reject) => {
    if (!secretKey) return;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as any);
    });
  });
};

export const setCookies = (
  ctx: Context,
  tokens?: { accessToken: string; refreshToken: string }
) => {
  if (tokens) {
    ctx.cookies.set('access_token', tokens.accessToken, {
      httpOnly: tokens.accessToken ? true : undefined,
      domain: process.env.NODE_ENV === 'production' ? '.paysys.kr' : undefined,
      secure: process.env.NODE_ENV === 'production' && true,
      sameSite: 'lax',
      maxAge: tokens.accessToken ? 1000 * 15 : undefined,
    });
    ctx.cookies.set('refresh_token', tokens.refreshToken, {
      httpOnly: tokens.refreshToken ? true : undefined,
      domain: process.env.NODE_ENV === 'production' ? '.paysys.kr' : undefined,
      secure: process.env.NODE_ENV === 'production' && true,
      sameSite: 'lax',
      maxAge: tokens.refreshToken ? 1000 * 60 * 60 * 24 * 30 : undefined,
    });
  } else {
    ctx.cookies.set('access_token');
    ctx.cookies.set('refresh_token');
  }
};

export const createToken = async (user: User) => {
  const tokenRepo = await getRepository(Token);
  const token = new Token();

  token.fk_user_id = user.id;

  await tokenRepo.save(token);

  const accessToken = await generateToken(
    { user_id: user.id, username: user.username, admin: user.admin },
    { subject: 'access_token', expiresIn: '15m' }
  );

  const refreshToken = await generateToken(
    { user_id: user.id, username: user.username, admin: user.admin, token_id: token.id },
    { subject: 'refresh_token', expiresIn: '15d' }
  );

  token.token = refreshToken;

  await tokenRepo.save(token);

  return { accessToken, refreshToken };
};

export const tokenRefresh = async (ctx: Context, prevRefreshToken: string) => {
  try {
    const decoded = await decodeToken<RefreshTokenType>(prevRefreshToken);
    const user = await getRepository(User).findOne(decoded.user_id);

    if (!user) {
      ctx.throw(500, 'Invalid User Error');
    }

    const now = new Date().getTime();
    const diff = decoded.exp * 1000 - now;
    let refreshToken = prevRefreshToken;

    if (diff < 1000 * 60 * 60 * 24 * 15) {
      refreshToken = await generateToken(
        {
          user_id: user.id,
          username: user.username,
          admin: user.admin,
          token_id: decoded.token_id,
        },
        { subject: 'refresh_token', expiresIn: '15d' }
      );
    }

    const accessToken = await generateToken(
      { user_id: user.id, username: user.username, admin: user.admin },
      { subject: 'access_token', expiresIn: '15m' }
    );

    setCookies(ctx, { accessToken, refreshToken });

    await getRepository(Token).update({ id: decoded.token_id }, { token: refreshToken });

    return decoded.user_id;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};
