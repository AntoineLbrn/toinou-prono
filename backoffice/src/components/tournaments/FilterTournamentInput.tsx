import { forwardRef, Input, InputProps } from "@chakra-ui/react";

const FilterTournamentInput = forwardRef<InputProps, 'input'>((props, ref) => (
    <Input variant="flushed" ref={ref} fontSize="sm" {...props} />
));

export default FilterTournamentInput;