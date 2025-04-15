import {Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {DataService} from 'src/app/shared/service/data/data.service';
import {SidebarService} from 'src/app/shared/service/sidebar/sidebar.service';
import {routes} from 'src/app/shared/service/routes/routes';
import {SidebarItem} from 'src/app/models/model';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/Auth/auth.service";

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss'],
})
export class StudentHeaderComponent implements OnInit  {
  base = '';
  page = '';
  last = '';
  public routes = routes;
  user: any = null;

  sidebar: SidebarItem[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private common: CommonService,
              private data: DataService,
              private sidebarService: SidebarService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.sidebar = this.data.sideBar;
    this.sidebarService.showDark.subscribe((res: string | boolean) => {
      if (res == 'true') {
        this.showDark = true;
      } else {
        this.showDark = false;
      }
    });
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }

  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }

  isDarkMode: boolean = false;
  public showDark = false;

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  public themeChange(): void {
    this.sidebarService.themeColor();
    this.applyTheme();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.user = response.ourUsers;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
