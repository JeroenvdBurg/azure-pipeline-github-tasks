"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const webClient_1 = require("./webClient");
const Utility_1 = require("./Utility");
class Action {
    /**
     * Adds a label to a PR
     * @param githubEndpointToken
     * @param label
     */
    addLabel(githubEndpointToken, label) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Adding label: "${label}"`);
            const repoId = tl.getVariable(Utility_1.AzureDevOpsVariables.buildRepositoryId);
            const pullRequestNumber = tl.getVariable(Utility_1.AzureDevOpsVariables.pullRequestNumber);
            let request = new webClient_1.WebRequest();
            request.uri = `${Utility_1.Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels`;
            request.method = "POST";
            request.body = JSON.stringify({
                "labels": [label]
            });
            request.headers = {
                "Content-Type": "application/json",
                'Authorization': 'token ' + githubEndpointToken
            };
            let response = yield webClient_1.sendRequest(request);
            tl.debug("Add label response: " + JSON.stringify(response));
            if (response.statusCode !== 200) {
                tl.error(`Error adding label: "${label}", status code: ${response.statusCode}, uri: ${request.uri}`);
                throw new Error(response.body["message"]);
            }
        });
    }
    /**
     * Remove label from a PR
     * @param githubEndpointToken
     * @param label
     */
    removeLabel(githubEndpointToken, label) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Removing label "${label}"`);
            const repoId = tl.getVariable(Utility_1.AzureDevOpsVariables.buildRepositoryId);
            const pullRequestNumber = tl.getVariable(Utility_1.AzureDevOpsVariables.pullRequestNumber);
            let request = new webClient_1.WebRequest();
            request.uri = `${Utility_1.Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels/${encodeURIComponent(label)}`;
            request.method = "DELETE";
            request.headers = {
                "Content-Type": "application/json",
                'Authorization': 'token ' + githubEndpointToken
            };
            let response = yield webClient_1.sendRequest(request);
            tl.debug("Remove label response: " + JSON.stringify(response));
            if (response.statusCode !== 200 && response.statusCode !== 404) {
                tl.error(`Error removing label: "${label}", status code: ${response.statusCode}, uri: ${request.uri}`);
                throw new Error(response.body["message"]);
            }
        });
    }
    /**
     * lists labels from a PR
     * @param githubEndpointToken
     * @param label
     */
    listLabels(githubEndpointToken, variable) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoId = tl.getVariable(Utility_1.AzureDevOpsVariables.buildRepositoryId);
            const pullRequestNumber = tl.getVariable(Utility_1.AzureDevOpsVariables.pullRequestNumber);
            let request = new webClient_1.WebRequest();
            request.uri = `${Utility_1.Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels`;
            request.method = "GET";
            request.headers = {
                "Content-Type": "application/json",
                'Authorization': 'token ' + githubEndpointToken
            };
            let response = yield webClient_1.sendRequest(request);
            tl.debug("List label response: " + JSON.stringify(response));
            if (response.statusCode !== 200) {
                tl.error(`Error listing labels: "status code: ${response.statusCode}, uri: ${request.uri}`);
                throw new Error(response.body["message"]);
            }
            else {
                tl.debug(response.body);
                let labelsObject = response.body;
                let labels = labelsObject.map(a => a.name).toString();
                tl.debug("List label object:" + labels);
                tl.setVariable(variable, labels, false, true);
            }
        });
    }
}
exports.Action = Action;
