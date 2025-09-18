import Container from "@/components/Container";
import { verifyEmail } from "@/services/axios";

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
async function VerifyEmail({searchParams}:ResetPasswordPageProps){
    const token = Array.isArray(searchParams.token) ? searchParams.token[0] : searchParams.token;
    if (token) {
        const result = await verifyEmail(token);
        if (result.success)
            console.log(result.message)
    }
    return (<Container>
        <div></div>
    </Container>)
}

export default VerifyEmail;