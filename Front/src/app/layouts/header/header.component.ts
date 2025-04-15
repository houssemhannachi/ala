import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarItem } from 'src/app/models/model';
import {AuthService} from "../../shared/service/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;
  headerpage = false;
  sticky = false;
  elementPosition!: number;
  public headerClass = true;
  base = '';
  page = '';
  last = '';
  headerMenuactive = '';
  public showDark = false;
  user: any = null;

  public white_bg = false;
  public isLoggedIn: any;

  sidebar: SidebarItem[];
  constructor(
    private router: Router,
    private authService: AuthService,
    private common: CommonService,
    private data: DataService,
    private sidebarService: SidebarService
  ) {
    this.loadUser();
    this.isLoggedIn = this.authService.isUserLoggedIn();
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

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (windowScroll == 0) {
      this.white_bg = false;
    } else {
      this.white_bg = true;
    }
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
  themeMode: string = 'light_mode';
  isDarkMode: boolean = false;
  // toggleMode(isDark: boolean) {
  //   this.isDarkMode = isDark;
  //   this.applyTheme();
  // }

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
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
