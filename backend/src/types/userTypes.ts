import {Request } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import { UserEntities } from '../entities/UserEntities';

export type User = {
    id: string;
    username: string;
    password: string;
    role: string;
    email: string
}

export type RequestWithUser = Request<ParamsDictionary, any, UserEntities>

export type RequestWithPayload = Request & { payload?: UserEntities }