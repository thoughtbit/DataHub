'use strict';

import React from 'react';
import {
  Row,
  Col,
  Button,
  Icon,
} from 'antd';

import {
  injectIntl,
} from 'react-intl';

import './Home.less';

function Home (props) {
  const formatMessage = props.intl.formatMessage;
  const features = [
    { icon: 'cloud-o', text: 'home.icon.cloud' },
    { icon: 'team', text: 'home.icon.team' },
    { icon: 'camera-o', text: 'home.icon.snapshot' },
    { icon: 'sync', text: 'home.icon.dataflow' },
    { icon: 'rocket', text: 'home.icon.quick' },
    { icon: 'eye-o', text: 'home.icon.scene' },
    { icon: 'clock-circle-o', text: 'home.icon.continues' },
    { icon: 'book', text: 'home.icon.document' },
    { icon: 'fork', text: 'home.icon.versioning' },
    { icon: 'tool', text: 'home.icon.setting' },
    { icon: 'database', text: 'home.icon.database' },
    { icon: 'save', text: 'home.icon.save' },
    { icon: 'disconnect', text: 'home.icon.decentration' },
    { icon: 'api', text: 'home.icon.api' },
    { icon: 'code-o', text: 'home.icon.cli' },
    { icon: 'global', text: 'home.icon.i18n' },
    { icon: 'github', text: 'home.icon.github' },
    { icon: 'download', text: 'home.icon.download', experiment: false },
  ];
  return (
    <React.Fragment>
      <section className="section">
        <div className="section-inner clearfix">
          <div className="project-entry">
            <p className="slogan">
              <span>DataHub</span> - {formatMessage({ id: 'common.slogan' })}
            </p>
            <a className="go-btn" href="/dashboard">
              <Button
                data-accessbilityid="go-btn-dashboard"
                type="primary"
                icon="rocket"
                size="large"
                ghost
              >{formatMessage({ id: 'home.go' })}
              </Button>
            </a>
            <p className="versioning">
              server: v{window.pageConfig.version}
            </p>
          </div>
          <div className="project-blueprint">
            <img src="//wx4.sinaimg.cn/large/6d308bd9gy1fokqvum2gsj20s10l70vh.jpg" />
          </div>
        </div>
      </section>
      <section className="section section-bg-skew">
        <div className="section-inner">
          <Row className="desc-icons">
            {
              features.map(({ icon, text, experiment = false }) => {
                return (
                  <Col key={`${icon}-${text}`} span={4}>
                    <Icon type={icon} />
                    <div className="text">{formatMessage({ id: text })}
                      {experiment && <Icon type="experiment" style={{
                        fontSize: '12px',
                        transform: 'scale(.6)',
                      }} />}
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

export default injectIntl(Home);
