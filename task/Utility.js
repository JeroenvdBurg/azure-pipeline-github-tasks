"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
class Utility {
    static getGithubEndPointToken(githubEndpoint) {
        const githubEndpointObject = tl.getEndpointAuthorization(githubEndpoint, false);
        let githubEndpointToken = '';
        if (!!githubEndpointObject) {
            tl.debug(`Endpoint scheme: ${githubEndpointObject.scheme}`);
            if (githubEndpointObject.scheme === 'PersonalAccessToken') {
                githubEndpointToken = githubEndpointObject.parameters.accessToken;
            }
            else if (githubEndpointObject.scheme === 'OAuth') {
                // scheme: 'OAuth'
                githubEndpointToken = githubEndpointObject.parameters.AccessToken;
            }
            else if (githubEndpointObject.scheme) {
                throw new Error(`Invalid GitHub endpoint auth scheme: "${githubEndpointObject.scheme}"`);
            }
        }
        if (!githubEndpointToken) {
            throw new Error(`Invalid GitHub endpoint: "${githubEndpoint}"`);
        }
        return githubEndpointToken;
    }
    static getGitHubApiUrl() {
        return this._githubApiUrl; // url without slash at end
    }
}
exports.Utility = Utility;
Utility._githubApiUrl = "https://api.github.com"; // url without slash at end
class ActionType {
}
exports.ActionType = ActionType;
ActionType.add = "add";
ActionType.remove = "remove";
ActionType.list = "list";
ActionType.export = "export";
class AzureDevOpsVariables {
}
exports.AzureDevOpsVariables = AzureDevOpsVariables;
AzureDevOpsVariables.buildRepositoryId = "Build.Repository.Id";
AzureDevOpsVariables.pullRequestNumber = "System.PullRequest.PullRequestNumber";
