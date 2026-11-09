//#region \0%23tanstack-start-server-fn-resolver
var manifest = { "18c37edb4bde20a5c406a149e83efee805f5884457f4f8e84afd362a48d2e139": {
	functionName: "predictLoan_createServerFn_handler",
	importer: () => import("./predict.functions-DIF9DqCk.js")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
