/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";

// my views
import MapaCriminal from "views/MapaCriminal/MapaCriminal.jsx";
import Estatisticas from "views/Estatisticas/Estatisticas.jsx";
import Timeline from "views/Timeline/Timeline.jsx";
import Denuncie from "views/Denuncie/Denuncie.jsx";

// my icons
import { TimelineOutline, PlaylistEdit } from 'mdi-material-ui';
import ShowChart from "@material-ui/icons/ShowChart";

const dashboardRoutes = [
  {
    path: "/mapacriminal",
    name: "Mapa Criminal",
    rtlName: "خرائط",
    icon: LocationOn,
    component: MapaCriminal,
    layout: "/admin"
  },
  {
    path: "/estatisticas",
    name: "Estatisticas",
    rtlName: "لوحة القيادة",
    icon: ShowChart,
    component: Estatisticas,
    layout: "/admin"
  },
  {
    path: "/timeline",
    name: "Timeline",
    rtlName: "لوحة القيادة",
    icon: TimelineOutline,
    component: Timeline,
    layout: "/admin"
  },
  {
    path: "/denuncie",
    name: "Denuncie Aqui",
    rtlName: "لوحة القيادة",
    icon: PlaylistEdit,
    component: Denuncie,
    layout: "/admin"
  },
];

export default dashboardRoutes;
