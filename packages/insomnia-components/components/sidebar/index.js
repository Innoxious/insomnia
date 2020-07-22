// @flow
import * as React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SidebarHeader from './sidebar-header';
import SidebarInfo from './sidebar-info';
import SidebarServers from './sidebar-servers';
import SidebarPaths from './sidebar-paths';
import SidebarRequests from './sidebar-requests';
import SidebarResponses from './sidebar-responses';
import SidebarParameters from './sidebar-parameters';
import SidebarHeaders from './sidebar-headers';
import SidebarSchemas from './sidebar-schemas';
import SidebarSecurity from './sidebar-security';
import Dropdown from '../dropdown/dropdown';
import DropdownItem from '../dropdown/dropdown-item';
import DropdownDivider from '../dropdown/dropdown-divider';
import SvgIcon, { IconEnum } from '../svg-icon';
import { useToggle } from 'react-use';

type Props = {|
  className?: string,
  jsonData: Object,
  onClick: (path: any) => any,
|};

let itemPath = [];
const _handleItemClick = (section, item) => {
  itemPath = [];
  itemPath.push(section);
  itemPath.push.apply(itemPath, item);
};

const StyledSidebar: React.ComponentType<{}> = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
  border: none;
  color: var(--color-font);
  position: relative;
  svg {
    font-size: var(--font-size-xl);
    fill: var(--hl-lg);
  }
  ul:first-child {
    border-top: none;
  }
  ul:last-child {
    border-bottom: none;
  }
`;

const StyledSection: React.ComponentType<{}> = styled(motion.ul)`
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid var(--hl-md);
`;

const DropdownEllipsis = () => <SvgIcon icon={IconEnum.ellipsesCircle} />;
// Section Expansion & Filtering

function Sidebar(props: Props) {
  // Section Visibility
  const [infoSec, setInfoSec] = useToggle(false);
  const [pathsVisible, setPathsVisible] = useToggle(true);
  const [serversVisible, setServersVisible] = useToggle(true);
  const [requestsVisible, setRequestsVisible] = useToggle(true);
  const [responsesVisible, setResponsesVisible] = useToggle(true);
  const [parametersVisible, setParametersVisible] = useToggle(true);
  const [headersVisible, setHeadersVisible] = useToggle(true);
  const [schemasVisible, setSchemasVisible] = useToggle(true);
  const [securityVisible, setSecurityVisible] = useToggle(true);

  // Sections
  if (props.jsonData === null) {
    return null;
  }
  const { servers, info } = props.jsonData;
  const {
    requestBodies,
    responses,
    parameters,
    headers,
    schemas,
    securitySchemes,
  } = props.jsonData.components;
  const paths = Object.entries(props.jsonData.paths);

  return (
    <StyledSidebar className="theme--sidebar">
      {info && (
        <StyledSection>
          <SidebarHeader headerTitle="INFO" sectionVisible={infoSec} toggleSection={setInfoSec}>
            <Dropdown renderButton={DropdownEllipsis}>
              <DropdownDivider>VISIBILITY</DropdownDivider>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setServersVisible}
                  defaultChecked={serversVisible}
                />
                <label htmlFor="servers">Servers</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input type="checkbox" onClick={setPathsVisible} defaultChecked={pathsVisible} />
                <label htmlFor="paths">Paths</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setRequestsVisible}
                  defaultChecked={requestsVisible}
                />
                <label htmlFor="requests">Requests</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setResponsesVisible}
                  defaultChecked={responsesVisible}
                />
                <label htmlFor="responses">Responses</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setParametersVisible}
                  defaultChecked={parametersVisible}
                />
                <label htmlFor="parameters">Parameters</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setHeadersVisible}
                  defaultChecked={headersVisible}
                />
                <label htmlFor="headers">Headers</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setSchemasVisible}
                  defaultChecked={schemasVisible}
                />
                <label htmlFor="schemas">Schemas</label>
              </DropdownItem>
              <DropdownItem stayOpenAfterClick>
                <input
                  type="checkbox"
                  onClick={setSecurityVisible}
                  defaultChecked={securityVisible}
                />
                <label htmlFor="security">Security</label>
              </DropdownItem>
            </Dropdown>
          </SidebarHeader>
          <SidebarInfo childrenVisible={infoSec} info={info} />
        </StyledSection>
      )}
      {serversVisible && servers && <SidebarServers servers={servers} onClick={_handleItemClick} />}
      {pathsVisible && paths && <SidebarPaths paths={paths} onClick={_handleItemClick} />}
      {requestsVisible && requestBodies && <SidebarRequests requests={requestBodies} />}
      {responsesVisible && responses && <SidebarResponses responses={responses} />}
      {parametersVisible && parameters && <SidebarParameters parameters={parameters} />}
      {headersVisible && headers && <SidebarHeaders headers={headers} />}
      {schemasVisible && schemas && <SidebarSchemas schemas={schemas} />}
      {securityVisible && schemas && <SidebarSecurity security={securitySchemes} />}
    </StyledSidebar>
  );
}

export default Sidebar;
