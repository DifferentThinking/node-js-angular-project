import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { Job } from './../../../models/job';
import { JobsService } from './../../../services/jobs.service'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnChanges {
  private jobs: Job[] = [];
  private pages: number[] = [];
  private allJobs = [];

  constructor(private jobsService: JobsService, private route: ActivatedRoute) { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) :void {
    let page = this.route.params['_value'].page;
    this.jobs = [];
    for (let i: number = (page * 8) - 8; i < (page * 8); i += 1) {
      let job = this.allJobs[i];
      let currentJob: Job = new Job(job.title, job.workHours, job.salary, job.description, job.author, job.pictureUrl);
      currentJob.id = job._id;

      this.jobs.push(currentJob);
    }
  }

  ngOnInit(): void {
    this.getAllJobs()
      .then(result => {
        this.allJobs = result;
        let pageNumber = 0;
        for (let i: number = 0; i < result.length; i += 1) {
          if (i % 7 === 0) {
            pageNumber += 1;
            this.pages.push(pageNumber);
          }
        }

        let page = this.route.params['_value'].page;
        this.jobs = [];
        for (let i: number = (page * 8) - 8; i < (page * 8); i += 1) {
          let job = result[i];
          let currentJob: Job = new Job(job.title, job.workHours, job.salary, job.description, job.author, job.pictureUrl);
          currentJob.id = job._id;

          this.jobs.push(currentJob);
        }
      });    
  }

  getAllJobs(): any {
    return this.jobsService.getAllJobs(); 
  }

  compareJobs(leftJob, rightJob): number {
    if (leftJob.title < rightJob.title)
      return -1;
    if (leftJob.title > rightJob.title)
      return 1;
    return 0;
  }

  sortJobs(): void {
    this.jobs.sort(this.compareJobs);
  }
}
