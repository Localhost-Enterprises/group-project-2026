import classNames from 'classnames';
import styles from './Dropdown.module.scss';

import { Select } from 'radix-ui';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import { Typography } from '@/components/atoms/Typography';
import { useId } from 'react';

type Props = {
  options: string[];
  optionLabels?: Record<string, string>;
  description?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  options,
  optionLabels,
  description,
  value,
  defaultValue,
  onChange,
  className,
}: Props) => {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-1">
      {description && (
        <Typography
          variant="smalltext"
          className={styles.description}
          id={labelId}
        >
          {description}
        </Typography>
      )}

      <Select.Root
        value={value}
        defaultValue={defaultValue ?? options[0]}
        onValueChange={onChange}
      >
        <Select.Trigger
          className={classNames(styles.trigger, className)}
          aria-labelledby={description ? labelId : undefined}
        >
          <Typography
            variant="button"
            className="min-w-0"
          >
            <Select.Value placeholder="Choose..." />
          </Typography>

          <Select.Icon className={`${styles.icon} shrink-0`}>
            <ArrowIcon direction="down" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            style={{
              minWidth: 'var(--radix-select-trigger-width)',
            }}
          >
            <Select.Viewport className={styles.viewport}>
              {options.map((option) => (
                <Select.Item
                  value={option}
                  key={option}
                  className={styles.item}
                >
                  <Select.ItemText>
                    <Typography variant="bodytext">
                      {optionLabels?.[option] ?? option}
                    </Typography>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
