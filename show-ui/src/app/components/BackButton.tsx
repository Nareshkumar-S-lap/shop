import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      className="mb-4 self-start"
      onClick={() => router.back()}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};

export default BackButton;
