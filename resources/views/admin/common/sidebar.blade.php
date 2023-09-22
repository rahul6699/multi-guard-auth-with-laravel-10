 <!-- Main Sidebar Container -->
 <aside class="main-sidebar sidebar-dark-primary elevation-4">
   <!-- Brand Logo -->
   <a href="admin" class="brand-link">
     <img src="{{ asset('back/images/slogo.png') }}" alt="AdminLTE Logo" class="brand-image "> 
     {{-- <span>ForestTwin</span> --}}
   </a>
   <!-- Sidebar -->
   <div class="sidebar">
     <!-- Sidebar user panel (optional) -->
     <div class="user-panel mt-3 pb-3 mb-3 d-flex">
       <div class="image">
         <img src="{{ asset('back/uploads/users/dumy_user.png') }}" class="img-circle elevation-2" alt="User Image">
    </div>
    <div class="info">
      <a href="javascript:void(0);" class="d-block text-decoration-none">{{ Auth::guard('admin')->user()->name }}
      <!-- <br><small>(test)</small> -->
    </a>       
  </div>
</div>    
<!-- Sidebar Menu -->
<nav class="mt-2">
  <ul class="nav nav-pills nav-sidebar flex-column myCustom" data-widget="treeview" role="menu" data-accordion="false">
    <!-- Add icons to the links using the .nav-icon class
      with font-awesome or any other icon font library -->
    {{-- <li class="nav-item has-treeview">
      <a href="<?php //url('admin') ?>" class="nav-link <?php //if($nav == 'dashboard'){echo 'active';}?>">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>Dashboard</p>
      </a>
    </li>menu-open --}}
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-cog"></i>
            <p >
            Carbon Credit <br/>Traceability
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
        <ul class="nav nav-treeview">
          <li class="nav-item ">
            <a href="<?= url('/admin') ?>" class="nav-link active <?php if($sub_nav == 'task_list'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Dashboard</p>
            </a>
          </li>            
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Project Status</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Project Details</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Sequstered Carbon Status</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Afforestation Status</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Biochar Production Status</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link <?php if($sub_nav == 'task_add'){echo 'active';}?>">
              <i class="far fa-circle nav-icon"></i>
              <p>Tree-cutting Alerts</p>
            </a>
          </li>
      </ul>
    </li>
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-list"></i>
            <p >
            GrrenHouse Emission Traceability
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
    </li>
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-list"></i>
            <p >
            Carbon Credit Trading
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
    </li>
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-list"></i>
            <p >
            Reporting and Analytics
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
    </li>
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-list"></i>
            <p >
            Communication and Notifications
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
    </li>
    <li class="nav-item has-treeview ">
        <a href="#" class="nav-link ">
          <i class="fa fa-list"></i>
            <p >
           Master Database
            </p>
          <i class="fas fa-angle-left right"></i>
        </a>
    </li>
  </ul>	
</nav>
   <!-- /.sidebar-menu -->
 </div>
 <!-- /.sidebar -->
</aside>