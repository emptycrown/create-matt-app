import React from 'react';

import {
  Button,
  Card,
  Footer,
  Header,
  Helix,
  IconCircle,
  Text,
} from '~/components';
import { Col, Row } from 'antd';
import { colors } from '~/styles/theme';

const DIRECTIONS = [
  {
    title: 'Save precious time',
    text:
      'Stream directly onto our platform from your studio or home. Any fan in the world can buy a ticket and tune in. We come to you; no travel or setup on your end needed! Treat these as one-off private events where you hang out with some of your biggest fans.',
    color: 'brightred',
  },
  {
    title: 'Engage with fans',
    text: `Each event is a combination of intimate performances and interaction with the audience. Fans can submit questions or even their own music for you to react to — the best way to grow your fanbase, without the headache of in-person logistics!`,
    color: 'brightindigo',
  },
  {
    title: 'Monetize globally',
    text: `Your reach and income from touring is limited, and sometimes it just doesn't make sense with your schedule. In this day and age, your fans are all over the world. We've built an elegant way to expand that reach and earn money without being on the road.`,
    color: 'brightblue',
  },
];

export default function LandingPage() {
  return (
    <div>
      <Header />
      <div className="resp-container flex justify-between items-center">
        <div className="py-12">
          <Text.Heading className="m-0">Landing page</Text.Heading>
          <Text.SubHeading>What your company is about</Text.SubHeading>
        </div>
        <Button large colorScheme={colors.deepBlue} style={{ width: 250 }}>
          Pre-register
        </Button>
      </div>
      <div className="bg-dark">
        <div
          className="resp-container flex flex-col justify-center"
          style={{ height: 400 }}
        >
          <div className="absolute" style={{ right: 0 }}>
            <img src="/static/graphics/landing.svg" style={{ height: 400 }} />
          </div>
          <div style={{ width: '50%' }} className="text-white text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="resp-container">
          <Text.Heading className="text-center text-3xl md:text-5xl">
            Section 1
          </Text.Heading>
          <div className="py-6">
            <Row gutter={50}>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="bg-dark resp-container-wrapper-card text-lg pt-4">
        <div className="h-64 relative mt-4">
          <Helix />
          <Helix offset={9} />
          <div className="absolute-centered pb-20">
            <Text.Heading className="text-white text-3xl md:text-5xl">
              Section 2
            </Text.Heading>
          </div>
        </div>
        <div className="resp-container">
          <Text.Subtitle className="text-center mb-6 text-white">
            How it works
          </Text.Subtitle>
          <Row gutter={32}>
            {DIRECTIONS.map(({ title, text, color }) => (
              <Col md={8} sm={24} key={title}>
                <Card.Standard
                  style={{
                    marginBottom: 16,
                    boxShadow: 'none',
                    padding: 32,
                  }}
                  className={`border border-${color} flex flex-col items-center`}
                >
                  <IconCircle type="check-circle" color={color} />
                  <Text.SubHeading className={`text-${color} mt-2 mb-3`}>
                    {title}
                  </Text.SubHeading>
                  <div className={`text-center text-white`}>{text}</div>
                </Card.Standard>
              </Col>
            ))}
          </Row>
        </div>
        <div className="bg-gray-800 mt-12">
          <div className="resp-container pt-12 pb-20">
            <Row gutter={50}>
              <Col md={12} sm={24}>
                <div>
                  <Text.SubHeading className="text-teal-400 mb-6 text-2xl">
                    Your legacy in the community
                  </Text.SubHeading>
                  <div className="text-white">
                    We built Encour to bridge the gap between fans and the
                    heroes they admire. Through a live-stream, we can see a
                    different side to our favorite artists and forge a genuine,
                    human connection. With a ticket, fans can request songs, see
                    "behind the curtain", and interact in a way that's
                    impossible anywhere else. Plus, they'll be in the same chat
                    as other members of the community!
                    <br /> <br />
                    After the live-stream, your content is packaged up into a
                    mini-movie, available forever. It'll serve as a permanent
                    stamp you leave on the community of your experiences,
                    knowledge, and artistry.
                    <br /> <br />
                    Convert your followers into superfans!
                  </div>
                </div>
              </Col>
              <Col md={12} sm={24}>
                <div
                  style={{
                    transform:
                      'perspective(300px) rotateX(2deg) rotateY(-4deg) rotateZ(2deg)',
                  }}
                >
                  <img
                    src="/static/graphics/music.png"
                    style={{ borderRadius: 10 }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="resp-container">
          <Text.Heading className="text-center text-3xl md:text-5xl">
            Section 3
          </Text.Heading>
          <div className="py-6">
            <Row gutter={50}>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
              <Col md={8} sm={24}>
                <div className="rounded bg-gray-200 h-64"></div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
