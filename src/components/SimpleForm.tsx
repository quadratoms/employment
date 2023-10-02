import { Checkbox, Form, Switch } from "antd";
import React from "react";


export const SimpleForm: React.FC<SimpleFormProps> = ({
    name, title, parent, statusText,
}) => {
    return (
        <div className="flex pt-4 ">
            <div className="flex-1 items-center font-bold">{title}</div>
            <div className="flex items-center justify-between flex-1">
                <Form.Item
                    name={[`${parent}`, `${name}`, statusText]}
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Checkbox defaultChecked className="text-xs">
                        <div className="text-xs">
                            {statusText === "mandatory" ? "Mandatory" : "internal"}
                        </div>
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    className=""
                    name={[`${parent}`, `${name}`, "show"]}
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch defaultChecked className="text-xs bg-slate-400" />
                </Form.Item>
            </div>
        </div>
    );
};

interface SimpleFormProps {
    name: String;
    title: String;
    parent?: String;
    statusText: "mandatory" | "internalUse";
}

