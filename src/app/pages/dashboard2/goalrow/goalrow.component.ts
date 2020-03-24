import { style } from '@angular/animations';
import { StopwatchService } from './../goaltable/stopwatchservice';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GoalService } from '../../../services/goal.service';

@Component({
    selector: 'app-goalrow',
    templateUrl: './goalrow.component.html',
    styleUrls: ['./goalrow.component.css']
})
export class GoalrowComponent implements OnInit {

    @Input('date') date: Date
    count: number = 0;
    hours: Array<Number> = [];
    minutes: Array<Number> = [];
    presentTime;
    givenTime;
    formGoal: FormGroup;
    goalId: number = 0;
    public addActive: boolean = false;
    public started: boolean;
    public stopped: boolean = false;
    public issaved: boolean = false;
    public isHide: boolean = true;
    public stopwatchService: StopwatchService;
    public time: number;
    private timer: any;

    constructor(stopwatchService: StopwatchService, private fb: FormBuilder, private goalService: GoalService) {
        this.stopwatchService = stopwatchService.init();
        this.time = 0;
        this.started = false;
        for (var hour = 0; hour < 13; hour++) {
            this.hours.push(hour)
        }
        for (var minute = 0; minute < 61; minute++) {
            this.minutes.push(minute)
        }
    }

    ngOnInit() {
        this.formGoal = this.fb.group({
            "txtGoal": [],
            "txtGoalDescription": [],
        })
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
        if (this.issaved == true) {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }
        }
    }

    update() {
        this.time = this.stopwatchService.time();
    }



    Save(tym, value) {
        var goal = tym.childNodes[1].lastElementChild.value;
        var description = tym.childNodes[3].firstElementChild.value;
        var hour = tym.childNodes[5].firstElementChild.childNodes[1].value;
        var minute = tym.childNodes[5].firstElementChild.childNodes[5].value;
        this.givenTime = (hour * 3600) + (minute * 60);

        if ((goal != "") && (description != "") && this.givenTime != 0) {
            var data = { goal, description, hour, minute }
            tym.childNodes[1].childNodes[1].replaceWith(goal);
            tym.childNodes[3].childNodes[1].replaceWith(description);
            tym.childNodes[5].firstElementChild.replaceWith(hour + ' hours ' + minute + ' minutes');
            // this.issaved = true;
            this.isHide = !this.isHide;
            let chosenDate = new Date(this.date.toISOString());
            let token = localStorage.getItem('token');
            value.expected_time = this.givenTime;
            value.chosenDate = chosenDate.getFullYear() + '/' + (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate()
            value.token = token;
            value.currentTime = chosenDate;

            this.goalService.postGoal(value).subscribe(res => { this.goalId = res.data.goalid; })
        }
        else {
            alert('Please fill out all the Fields')
        }
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
            let accuracy;
            if (calculation >= 100) {
                accuracy = 100
            } else if (calculation < 0) {
                accuracy = 0
            } else {
                accuracy = calculation.toFixed(2);
            }
            let val = {
                token: localStorage.getItem('token'), goalId: this.goalId, accuracy: accuracy, status: true, actualTime: actualTime
            }
            this.goalService.updateAccuracy(val).subscribe(resp => {
                tym.childNodes[7].childNodes[1].replaceWith(h, " hours  ", m, " minutes");
                tym.childNodes[10].childNodes[3].replaceWith(accuracy + ' %');
            })
        })
        // if (this.presentTime != 0) {
        //     // wid.style.width = "100%";
        //     this.stopped = true;
        //     this.stop();
        //     let value = {
        //         actualTime: this.presentTime, token: localStorage.getItem('token'), goalId: this.goalId
        //     }
        //     this.goalService.getSingleGoal(value).subscribe(res => console.log(res))
        //     if (this.presentTime < this.givenTime) {
        //         // wid.style.background = "#14bc30";
        //     }
        //     else {
        //         // wid.style.background = "#E7505A";
        //     }
        // }
        // else {
        //     alert('Please start the Timer.')
        // }
    }

    Stopped(wid, tym) {

        if ((this.issaved == true) && (this.presentTime != 0)) {

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

            if (((wid.style.width == "25%") && this.presentTime < (this.givenTime / 4))
                || ((wid.style.width == "50%") && this.presentTime < (this.givenTime / 2))
                || ((wid.style.width == "75%") && this.presentTime < (3 * this.givenTime / 4))
                || ((wid.style.width == "100%") && this.presentTime < (this.givenTime))) {
                wid.style.background = "#14bc30";
            }
            if (((wid.style.width == "25%") && this.presentTime >= (this.givenTime / 4))
                || ((wid.style.width == "50%") && this.presentTime >= (this.givenTime / 2))
                || ((wid.style.width == "75%") && this.presentTime >= (3 * this.givenTime / 4))
                || ((wid.style.width == "100%") && this.presentTime >= (this.givenTime))) {
                wid.style.background = "#E7505A";
            }

        }

        else {
            alert('Please start the Timer.')
        }
    }

}