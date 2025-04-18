import AppDataSource from 'src/config/database/ormconfig';

export const createTransaction = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
};
