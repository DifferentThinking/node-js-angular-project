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

  constructor(private jobsService: JobsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllJobs()
      .then(result => {
        let pageNumber = 0;
        for (let i: number = 0; i < result.length; i += 1) {
          if (i % 7 === 0) {
            pageNumber += 1;
            this.pages.push(pageNumber);
          }
        }

        let page = this.route.params['_value'].page;
        for (let i: number = (page * 8) - 8; i < (page * 8); i += 1) {
          this.jobs = [];
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
