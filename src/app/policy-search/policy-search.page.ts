import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-policy-search",
  templateUrl: "./policy-search.page.html",
  styleUrls: ["./policy-search.page.scss"],
})
export class PolicySearchPage implements OnInit {
  constructor(
    private NavController: NavController,
    ) {}

  ngOnInit() {
  }

  searchPolicy() {
    this.NavController.navigateForward(["policy-search-result"]);
  }
}
