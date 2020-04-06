import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormField } from "@angular/material/form-field";

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
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    console.log(this.dataSource.filter);
  }

  ngOnInit() {}

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
