import React from "react";
import { Tabs } from "@feuer/react-tabs";
import Info from "./Movies/Info";
import Poster from './Movies/Poster'

export default function TabHolder() {
  return (
    <div className="App">
      <Tabs
        tabsProps={{
          style: {
            textAlign: "left"
          }
        }}
        activeTab={{
          id: "tab1"
        }}
      >
        <Tabs.Tab id="tab1" title="Tab 1">
          <Info/>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" title="Tab 2">
         <Poster/>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
