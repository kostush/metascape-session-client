"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionClientModule = void 0;
const common_1 = require("@nestjs/common");
const session_client_1 = require("./session-client");
const session_client_module_definition_1 = require("./session-client.module-definition");
const session_connection_manager_1 = require("./session-connection-manager");
let SessionClientModule = class SessionClientModule extends session_client_module_definition_1.ConfigurableModuleClass {
};
SessionClientModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: session_client_1.SessionClient,
                useFactory: (configurations) => {
                    return new session_client_1.SessionClient(configurations);
                },
                inject: [session_client_module_definition_1.MODULE_OPTIONS_TOKEN],
            },
            session_connection_manager_1.SessionConnectionManager,
        ],
        exports: [session_client_1.SessionClient],
    })
], SessionClientModule);
exports.SessionClientModule = SessionClientModule;
//# sourceMappingURL=session-client.module.js.map