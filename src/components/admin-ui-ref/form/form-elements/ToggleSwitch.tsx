'use client';
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Switch from '../switch/Switch';

export default function ToggleSwitch() {
  const [switchStates, setSwitchStates] = useState({
    defaultBlue: true,
    checkedBlue: true,
    defaultGray: true,
    checkedGray: true,
  });

  const handleSwitchChange = (key: keyof typeof switchStates) => (checked: boolean) => {
    setSwitchStates(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <ComponentCard title="Toggle switch input">
      <div className="flex gap-4">
        <Switch
          label="Default"
          defaultChecked={true}
          onChange={handleSwitchChange('defaultBlue')}
        />
        <Switch
          label="Checked"
          defaultChecked={true}
          onChange={handleSwitchChange('checkedBlue')}
        />
        <Switch label="Disabled" disabled={true} />
      </div>
      {' '}
      <div className="flex gap-4">
        <Switch
          label="Default"
          defaultChecked={true}
          onChange={handleSwitchChange('defaultGray')}
          color="gray"
        />
        <Switch
          label="Checked"
          defaultChecked={true}
          onChange={handleSwitchChange('checkedGray')}
          color="gray"
        />
        <Switch label="Disabled" disabled={true} color="gray" />
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Default (blue):
          {' '}
          {switchStates.defaultBlue ? 'On' : 'Off'}
        </p>
        <p>
          Checked (blue):
          {' '}
          {switchStates.checkedBlue ? 'On' : 'Off'}
        </p>
        <p>
          Default (gray):
          {' '}
          {switchStates.defaultGray ? 'On' : 'Off'}
        </p>
        <p>
          Checked (gray):
          {' '}
          {switchStates.checkedGray ? 'On' : 'Off'}
        </p>
      </div>
    </ComponentCard>
  );
}
