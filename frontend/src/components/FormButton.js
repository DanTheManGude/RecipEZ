import { styled } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)({
  background: '#e6e6e6',
});

function FormButton(props) {
  const { text } = props
  return <StyledButton {...props}>{text}</StyledButton>
}

export default FormButton;
