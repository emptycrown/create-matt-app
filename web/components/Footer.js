import React from 'react';

import { BrandName, Button, Text } from '~/components';
import { Link } from 'react-router-dom';
import { colors } from '~/styles/theme';

export default function Footer({ dark }) {
  let className = 'py-10 text-sm leading-loose border-gray-200 border-t-2';
  if (dark) className = 'py-10 text-sm leading-loose text-gray-500 bg-gray-800';

  const buttonColor = dark ? colors.gray[500] : colors.gray[300];

  return (
    <div className={className}>
      <div className="resp-container">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex mb-6 md:mb-0">
            <div style={{ maxWidth: 150 }}>
              <BrandName />
              <div>© 2019 NewCo Inc.</div>
            </div>
            <div className="ml-16">
              <Text.Caption className="text-pink-500">contact</Text.Caption>
              <Link to="/">Home</Link>
              <br />
              <a href="mailto:hello@camelot.ai">Email us</a>
              <br />
              <a
                href="https://discord.gg/8dD5TV9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join our chat
              </a>
            </div>
          </div>
          <div className="text-left md:text-right">
            <Text.Caption className="text-brightblue mb-2">follow</Text.Caption>
            <div className="my-2">
              {[
                {
                  href: '#',
                  icon: 'twitter',
                },
                {
                  href: '#',
                  icon: 'instagram',
                },
                {
                  href: '#',
                  icon: 'facebook',
                },
              ].map(({ href, icon }, idx) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    style={{
                      width: 'auto',
                      ...(idx > 0 && { marginLeft: 16 }),
                    }}
                    icon={icon}
                    {...(icon !== 'twitter' && { iconTheme: 'filled' })}
                    backgroundColor={buttonColor}
                    hoverBackgroundColor={colors.brightblue}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
