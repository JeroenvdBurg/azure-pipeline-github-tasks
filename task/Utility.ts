import tl = require("azure-pipelines-task-lib/task");
import path = require("path");
import fs = require('fs');

export class Utility {

    public static getGithubEndPointToken(githubEndpoint: string): string {
        const githubEndpointObject = tl.getEndpointAuthorization(githubEndpoint, false);
        let githubEndpointToken: string = '';

        if (!!githubEndpointObject) {
            tl.debug(`Endpoint scheme: ${githubEndpointObject.scheme}`);
            
            if (githubEndpointObject.scheme === 'PersonalAccessToken') {
                githubEndpointToken = githubEndpointObject.parameters.accessToken
            } else if (githubEndpointObject.scheme === 'OAuth'){
                // scheme: 'OAuth'
                githubEndpointToken = githubEndpointObject.parameters.AccessToken
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


    public static getGitHubApiUrl(): string {
        return this._githubApiUrl; // url without slash at end
    }  

    
    private static readonly _githubApiUrl: string = "https://api.github.com"; // url without slash at end
}

export class ActionType {
    public static readonly add = "add";
    public static readonly remove = "remove";
    public static readonly list = "list";
    public static readonly export = "export";
}

export class AzureDevOpsVariables {
    public static readonly buildRepositoryId: string = "Build.Repository.Id"; 
    public static readonly pullRequestNumber: string = "System.PullRequest.PullRequestNumber"
}

export interface  LabelsObj {
     name: string;    
}



