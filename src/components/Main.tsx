import React, { ReactNode, useEffect, useState } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "menu1", <HomeOutlined />),

  getItem("Settings", "menu2", <BookOutlined />),
];

interface DefaultLayoutProps {
  children: ReactNode;
}

const Main: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 760);

  const handleResize = () => {
    setCollapsed(window.innerWidth <= 760);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full ">
        <Button
          type="default"
          className="text-start"
          color="red"
          block
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined color="black" />
          ) : (
            <MenuFoldOutlined color="black" />
          )}
        </Button>
        <Menu
          className={`h-full ${!collapsed&& "w-60"}`}
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          
          

          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div className="h-full flex-1">{children}</div>
    </div>
  );
};

export default Main;
