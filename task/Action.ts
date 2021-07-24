import tl = require("azure-pipelines-task-lib/task");
import path = require("path");
import fs = require('fs');
import { WebResponse, sendRequest, WebRequest } from "./webClient";
import { Utility, AzureDevOpsVariables, LabelsObj } from "./Utility";

export class Action {
    

    /**
     * Adds a label to a PR
     * @param githubEndpointToken 
     * @param label
     */
    public async addLabel(githubEndpointToken: string, label: string): Promise<void> {
        console.log(`Adding label: "${label}"`);
        const repoId = tl.getVariable(AzureDevOpsVariables.buildRepositoryId);
        const pullRequestNumber = tl.getVariable(AzureDevOpsVariables.pullRequestNumber);
        let request = new WebRequest();
        request.uri = `${Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels`;
        request.method = "POST";
        request.body = JSON.stringify({
            "labels": [ label ]
        });
        request.headers = {
            "Content-Type": "application/json",
            'Authorization': 'token ' + githubEndpointToken
        };

        let response = await sendRequest(request);

        tl.debug("Add label response: " + JSON.stringify(response));    
        if (response.statusCode !== 200) {            
            tl.error(`Error adding label: "${label}", status code: ${response.statusCode}, uri: ${request.uri}`);
            throw new Error(response.body["message"]);
        }  
    }

    /**
     * Remove label from a PR
     * @param githubEndpointToken 
     * @param label
     */
    public async removeLabel(githubEndpointToken: string, label: string): Promise<void> {
        console.log(`Removing label "${label}"`);    
        const repoId = tl.getVariable(AzureDevOpsVariables.buildRepositoryId);
        const pullRequestNumber = tl.getVariable(AzureDevOpsVariables.pullRequestNumber);
        let request = new WebRequest();
        request.uri = `${Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels/${encodeURIComponent(label)}`;
        request.method = "DELETE";
        request.headers = {
            "Content-Type": "application/json",
            'Authorization': 'token ' + githubEndpointToken
        };

        let response = await sendRequest(request);

        tl.debug("Remove label response: " + JSON.stringify(response));    
        if (response.statusCode !== 200 && response.statusCode !== 404) {            
            tl.error(`Error removing label: "${label}", status code: ${response.statusCode}, uri: ${request.uri}`);
            throw new Error(response.body["message"]);
        }  
    }
    
    /**
     * lists labels from a PR
     * @param githubEndpointToken 
     * @param label
     */
    public async listLabels(githubEndpointToken: string, variable: string): Promise<void> {
        const repoId = tl.getVariable(AzureDevOpsVariables.buildRepositoryId);
        const pullRequestNumber = tl.getVariable(AzureDevOpsVariables.pullRequestNumber);       
        let request = new WebRequest();
        request.uri = `${Utility.getGitHubApiUrl()}/repos/${repoId}/issues/${pullRequestNumber}/labels`;
        request.method = "GET";
        request.headers = {
            "Content-Type": "application/json",
            'Authorization': 'token ' + githubEndpointToken
        };

        let response = await sendRequest(request);        
       

        tl.debug("List label response: " + JSON.stringify(response));    
        if (response.statusCode !== 200) {            
            tl.error(`Error listing labels: "status code: ${response.statusCode}, uri: ${request.uri}`);
            throw new Error(response.body["message"]);
        } else {
            tl.debug(response.body);            
            let labelsObject: LabelsObj[] = response.body;

            let labels= labelsObject.map(a => a.name).toString();
            tl.debug("List label object:" + labels)
            tl.setVariable(variable, labels, false, true);
        }       
       
    }    
}