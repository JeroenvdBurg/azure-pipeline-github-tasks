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
const Utility_1 = require("./Utility");
const Action_1 = require("./Action");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const githubEndpoint = tl.getInput('gitHubConnection', true);
            const githubEndpointToken = Utility_1.Utility.getGithubEndPointToken(githubEndpoint);
            const action = tl.getInput('action', true).toLowerCase();
            const label = tl.getInput('label', false);
            const variable = tl.getInput('variable', false);
            if (action == Utility_1.ActionType.add) {
                yield new Action_1.Action().addLabel(githubEndpointToken, label);
            }
            else if (action == Utility_1.ActionType.remove) {
                yield new Action_1.Action().removeLabel(githubEndpointToken, label);
            }
            else if (action == Utility_1.ActionType.list) {
                yield new Action_1.Action().listLabels(githubEndpointToken, variable);
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
