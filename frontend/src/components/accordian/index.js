import React from "react";
import "./css/index.css";
import { Collapse } from "antd";
import { down_arrow3, up_arrow2 } from "../../assets";
import ButtonComponent from "../button";
import { useSelector } from "react-redux";

import TermAndConditionComp from "../policies/termAndCondition";
import CopyRightComp from "../policies/copyRight";
import PrivacyPolicyComp from "../policies/privacyPolicy";

const AccordianComponent = ({
  data,
  list,
  btnKey,
  termKey,
  copyrightKey,
  privacyKey,
}) => {
  const textColor = useSelector((state) => state.app.theme.textColor);
  const bgColor3 = useSelector((state) => state.app.theme.bgColor3);
  const border = useSelector((state) => state.app.theme.border);
  const { Panel } = Collapse;
  return (
    <div className={`mt-4 ${bgColor3}`}>
      <Collapse
        accordion
        expandIconPosition={"right"}
        className={border}
        ghost={true}
        expandIcon={({ isActive }) =>
          isActive ? (
            <img src={up_arrow2} style={{ width: 20 }} />
          ) : (
            <img src={down_arrow3} style={{ width: 20 }} />
          )
        }
      >
        {data &&
          data.map((e) => {
            return (
              <Panel className={`${border} p-2`} header={e.title} key={e.key}>
                {list ? (
                  <ul>
                    <li className={`py-3 ${textColor}`}>{e.description}</li>
                  </ul>
                ) : (
                  <>
                    <span className={textColor}>{e.description}</span>
                    {e.key === btnKey && (
                      <div className="d-flex mt-4 justify-content-center">
                        <div style={{ minWidth: "20%" }}>
                          <ButtonComponent
                            height={40}
                            text={"Change Password"}
                          />
                        </div>
                      </div>
                    )}

                    {e.key === termKey && <TermAndConditionComp />}
                    {e.key === copyrightKey && <CopyRightComp />}
                    {e.key === privacyKey && <PrivacyPolicyComp />}
                  </>
                )}
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

export default AccordianComponent;
