"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakeywakeyStack = void 0;
const core_1 = require("@aws-cdk/core");
const wakeywakey_1 = require("./wakeywakey");
class WakeywakeyStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        new wakeywakey_1.WakeyWakey(this, 'nighty-night', { instanceId: 'i-123123123123' });
    }
}
exports.WakeywakeyStack = WakeywakeyStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FrZXl3YWtleS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndha2V5d2FrZXktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTZEO0FBQzdELDZDQUEwQztBQUUxQyxNQUFhLGVBQWdCLFNBQVEsWUFBSztJQUV4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlCO1FBQ3pELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUM3QyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBUkQsMENBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBXYWtleVdha2V5IH0gZnJvbSBcIi4vd2FrZXl3YWtleVwiO1xuXG5leHBvcnQgY2xhc3MgV2FrZXl3YWtleVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICBuZXcgV2FrZXlXYWtleSh0aGlzLCAnbmlnaHR5LW5pZ2h0Jywge2luc3RhbmNlSWQ6ICdpLTEyMzEyMzEyMzEyMyd9KTtcbiAgfVxufVxuIl19