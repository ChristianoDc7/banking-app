import { BankingDataSource } from "../db/DataSources";
import { UserEntities } from "../entities/UserEntities";
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RequestWithPayload } from "../types/userTypes";
import { isAdmin } from "../utils/Utils";


export const userRepository = BankingDataSource.getRepository(UserEntities);

export const DeleteUser = async (id: number) => {
    return userRepository.delete({ id: id });
}

export const CreateUser = async (user: UserEntities) => {
    const hashedPassword = await bcrypt.hash(user?.password, 10)
    const newUser = await userRepository.save({
        ...user,
        password: hashedPassword
    });
    return newUser;
}

export const UpdateUser = async (user: UserEntities, id: number) => {
    const hashedPassword = !!user?.password ? await bcrypt.hash(user?.password, 10) : undefined
    
    if(!user) return {}

    const updatedUser = await userRepository.update({ id: id }, {
        ...user,
        ...(!!hashedPassword ? { password: hashedPassword } : {})
    });
    return updatedUser;
}

export const GetUser = async (id: number, auth = false) => {
    const user = await userRepository.findOneBy({ id: id });
    if (auth) {
        return user
    }
    return _.omit(user, "password")
}

export const GetAllUsers = async (req: RequestWithPayload) => {
    const users = await userRepository.find();
    return users?.map(user => _.omit(user, isAdmin(req?.payload?.id || 0) ? "password" : ["password", "amount"]))
}