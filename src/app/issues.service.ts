import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

 private issues: Issue[] = [];

 constructor() { }

 getPendingIssues(): Issue[] {
 return this.issues.filter(issue => !issue.completed);
 }

 createIssue(issue: Issue) {
  issue.issueNo = this.issues.length + 1;
  this.issues.push(issue);
 }

 completeIssue(issue: Issue) {
  const selectedIssue: Issue = {
  ...issue,
  completed: new Date()
  };
  const index = this.issues.findIndex(i => i === issue);
  this.issues[index] = selectedIssue;
 }

 getSuggestions(title: string): Issue[] {
  if (title.length > 3) {
  return this.issues.filter(issue =>
  issue.title.indexOf(title) !== -1);
  }
  return [];
 }

 updateIssue(issueNo: number, issue: Issue) {
  const existingIssue = this.issues.find(i => i.issueNo === issueNo);
  if(existingIssue) {
    const index = this.issues.indexOf(existingIssue);
    this.issues[index] = {
      ...existingIssue,
      ...issue
    };
  }
}
}
