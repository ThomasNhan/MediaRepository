import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormField } from "@angular/material/form-field";
import { LoginService } from "../api.login.service";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Media } from "../media";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.css"],
})
export class MediaComponent implements OnInit, AfterViewInit {
  mediaList: Media[];
  resultCount: number;
  searchString: string;
  dataSource: MatTableDataSource<any[]>;
  displayedColumns = [
    "Title",
    "Author",
    "Media",
    "Description",
    "UploadDate",
    "PublicationDate",
    "SubmittedBy",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: LoginService
  ) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    console.log(this.dataSource.filter);
  }

  ngOnInit() {
    if (this.auth.isLoggedOut()) {
      this.router.navigateByUrl("/login");
    }
  }

  ngAfterViewInit(): void {
    this.api.getMedia().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res.data);
      },
      (err) => console.log(err),
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
}
