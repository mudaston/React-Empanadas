type ButtonTypes =
  | 'none'
  | 'choose-filter-button'
  | 'add-item-button'
  | 'empty-basket-button'
  | 'get-back-button-with-icon'
  | 'get-back-button'
  | 'pay-now-button'
  | 'rounded-button-orange'
  | 'rounded-button-grey'

type Subcomponents = {
  LabelBold: FC<LabelBoldProps>
  LabelRegular: FC<LabelRegularProps>
  Icon: FC<IconProps>
  Counter: FC<CounterProps>
}
