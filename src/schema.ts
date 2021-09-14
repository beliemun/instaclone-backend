import { loadFilesSync, mergeTypeDefs, mergeResolvers } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers) as any; // [중요] any 타입으로 안해주면, 타입이 안맞아서 헤로쿠에서 푸시할 때 오류남
