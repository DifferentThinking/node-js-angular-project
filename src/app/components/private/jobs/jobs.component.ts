import { Component, OnInit } from '@angular/core';

import { Job } from './../../../models/job';
import { JobsService } from './../../../services/jobs.service'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  private jobs: Job[] = [];
  private pages: number[] = [];
  private allJobs = [];

  constructor(private jobsService: JobsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllJobs()
      .then(result => {
        this.allJobs = result;
        let pageNumber = 0;
        for (let i: number = 0; i < result.length; i += 1) {
          if (i % 8 === 0) {
            pageNumber += 1;
            this.pages.push(pageNumber);
          }
        }

        let page = 1;
        this.jobs = [];
        for (let i: number = (page * 8) - 8; i < (page * 8); i += 1) {
          let job = result[i];
          let currentJob: Job = new Job(job.title, job.workHours, job.salary, job.description, job.author, job.pictureUrl);
          currentJob.id = job._id;

          this.jobs.push(currentJob);
        }
      });    
  }

  changePage(page: number): void {
    console.log("ASD");
    console.log(page);
    page = +page;
    this.jobs = [];
    for (let i: number = (page * 8) - 8; i < (page * 8); i += 1) {
      let job = this.allJobs[i];
      let currentJob: Job = new Job(job.title, job.workHours, job.salary, job.description, job.author, job.pictureUrl);
      currentJob.id = job._id;

      this.jobs.push(currentJob);
    }
  }

  getAllJobs(): any {
    return this.jobsService.getAllJobs(); 
  }
}
