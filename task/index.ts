import tl = require("azure-pipelines-task-lib/task");
import { Utility, ActionType } from "./Utility"
import { Action } from "./Action"

async function run() {
    try {
        const githubEndpoint: string = tl.getInput('gitHubConnection', true);
        const githubEndpointToken = Utility.getGithubEndPointToken(githubEndpoint);
        const action = tl.getInput('action', true).toLowerCase();
        const label = tl.getInput('label', false);
        const variable = tl.getInput('variable', false);
        
        if (action == ActionType.add) {
            await new Action().addLabel(githubEndpointToken, label);
        } else if (action == ActionType.remove) {
            await new Action().removeLabel(githubEndpointToken, label);            
        }
         else if (action == ActionType.list) {
            await new Action().listLabels(githubEndpointToken, variable);            
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}



run();