import { StopwatchService } from './../goaltable/stopwatchservice';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GoalService } from '../../../services/goal.service';


@Component({
    selector: 'app-incompletegoals',
    templateUrl: './incompletegoals.component.html',
    styleUrls: ['./incompletegoals.component.css']
})
export class IncompletegoalsComponent implements OnInit {

    @Input('date') date: Date
    @Input('date') Todaydate: Date
    @Input('IncompleteGoals') IncompleteGoals: any
    count: number = 0;
    GoalNames: string[];
    GoalDescriptions: string[];
    GoalExpectedTimes: any[];
    minutes: Array<Number> = [];
    presentTime;
    givenTime;
    accuracy;
    actual_time;
    savedAccuracy;
    formGoal: FormGroup;
    goalId: number = 0;
    public addActive: boolean = false;
    public started: boolean;
    public stopped: boolean = false;
    public stopwatchService: StopwatchService;
    public time: number;
    private timer: any;

    constructor(stopwatchService: StopwatchService, private fb: FormBuilder, private goalService: GoalService) {
        this.stopwatchService = stopwatchService.init();
        this.time = 0;
        this.started = false;
    }

    ngOnInit() {
        this.formGoal = this.fb.group({
            "txtGoal": [],
            "txtGoalDescription": []
        })
        this.savedAccuracy = this.IncompleteGoals.accuracy;
        this.actual_time = this.IncompleteGoals.actual_time;
        let expectedhours = ((this.IncompleteGoals.expected_time / 3600) - (this.IncompleteGoals.expected_time / 3600) % 1);
        let expectedminutes = (this.IncompleteGoals.expected_time / 60) % 60;
        this.GoalNames = [this.IncompleteGoals.goal_name];
        this.GoalDescriptions = [this.IncompleteGoals.goal_description];
        this.GoalExpectedTimes = [expectedhours + ' hours ' + expectedminutes + ' minutes'];
        this.goalId = this.IncompleteGoals.id;
    }

    Complete(tym) {
        let value = {
            token: localStorage.getItem('token'), goalId: this.goalId
        }
        this.goalService.getSingleGoal(value).subscribe(res => {
            let goalStartTime = res.data[0].currentTime;
            let expectedTime = res.data[0].expected_time;
            let hour = new Date(goalStartTime).getHours();
            let minute = new Date(goalStartTime).getMinutes();
            let expTime = (hour * 60 * 60) + (minute * 60);
            let currentHour = new Date().getHours();
            let currentMinute = new Date().getMinutes();
            let currentTime = (currentHour * 60 * 60) + (currentMinute * 60);
            let actualTime = currentTime - expTime;
            var d = Number(actualTime);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            // var s = Math.floor(d % 3600 % 60);
            let calculation = (expectedTime / actualTime) * 100;
            if (calculation >= 100) {
                this.accuracy = 100
            } else {
                this.accuracy = calculation.toFixed(2);
            }
            let val = {
                token: localStorage.getItem('token'), goalId: this.goalId, accuracy: this.accuracy, status: true, actualTime: actualTime
            }
            this.goalService.updateAccuracy(val).subscribe(resp => {
                tym.childNodes[11].childNodes[1].replaceWith(h, " hours  ", m, " minutes");
                tym.childNodes[14].childNodes[2].replaceWith(this.accuracy + ' %');

            })
        })
        // if (this.presentTime < this.IncompleteGoals.expected_time) {
        //     wid.style.background = "#14bc30";
        // }
        // else {
        //     wid.style.background = "#E7505A";
        // }

    }

    formatTime(timeMs: number, e, wid) {
        let hours: string,
            minutes: string,
            seconds: string;
        hours = Math.floor(timeMs / 3600000).toString();
        minutes = Math.floor(timeMs / 60000).toString();
        seconds = ((timeMs % 60000) / 1000).toFixed();
        this.presentTime = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);

        return hours + ':' + minutes + ':' + seconds;
    }

    getUpdate() {
        let self = this;
        return () => {
            self.time = this.stopwatchService.time();
        };
    }
    start() {
        this.timer = setInterval(this.getUpdate(), 1);
        this.stopwatchService.start();
        this.started = true;
    }
    stop() {
        clearInterval(this.timer);
        this.stopwatchService.stop();
        this.started = false;
    }
    toggle() {
        if (this.started) {
            this.stop();
        } else {
            this.start();
        }
    }

    update() {
        this.time = this.stopwatchService.time();
    }
    Stopped(wid, tym) {
        if (this.presentTime != 0) {
            var a = parseInt(wid.style.width) + 25
            if (a >= 100) {
                wid.style.width = "100%";
                this.stopped = true;

                this.stop();
                let value = {
                    actualTime: this.presentTime, token: localStorage.getItem('token'), goalId: this.goalId
                }
                this.goalService.postGoal(value).subscribe(res => console.log(res))
            }
            else {
                wid.style.width = `${a}%`;

            }
            if (((wid.style.width == "25%") && this.presentTime < (this.IncompleteGoals.expected_time / 4))
                || ((wid.style.width == "50%") && this.presentTime < (this.IncompleteGoals.expected_time / 2))
                || ((wid.style.width == "75%") && this.presentTime < (3 * this.IncompleteGoals.expected_time / 4))
                || ((wid.style.width == "100%") && this.presentTime < (this.IncompleteGoals.expected_time))) {
                wid.style.background = "#14bc30";
            }
            if (((wid.style.width == "25%") && this.presentTime >= (this.IncompleteGoals.expected_time / 4))
                || ((wid.style.width == "50%") && this.presentTime >= (this.IncompleteGoals.expected_time / 2))
                || ((wid.style.width == "75%") && this.presentTime >= (3 * this.IncompleteGoals.expected_time / 4))
                || ((wid.style.width == "100%") && this.presentTime >= (this.IncompleteGoals.expected_time))) {
                wid.style.background = "#E7505A";
            }
        }
        else {
            alert('Please start the Timer.')
        }
    }

}
