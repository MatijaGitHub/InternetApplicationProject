"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const workshop_routes_1 = __importDefault(require("./routers/workshop.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const uri = "mongodb://127.0.0.1:27017/UmetnickeRadioniceDB";
mongoose_1.default.connect(uri);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("Connected!");
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/workshops', workshop_routes_1.default);
app.use(express_1.default.static('images'));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map