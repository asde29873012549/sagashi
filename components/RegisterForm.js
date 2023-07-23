import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  return (
    <div className="hidden">
      <Tabs
        defaultValue="login"
        className="fixed z-20 inset-0 m-auto w-9/12 h-4/6 max-w-max max-h-max min-w-fit"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="h-4/6 w-9/12 max-w-max max-h-max min-w-fit">
            <CardHeader className="flex justify-center items-center mb-2">
              <CardTitle>LOGIN</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 space-y-1 md:mb-6">
                <Label htmlFor="username">USERNAME</Label>
                <Input id="username" placeholder="username" className="w-80" />
              </div>
              <div className="mb-5 space-y-1 md:mb-8">
                <Label htmlFor="password">PASSWORD</Label>
                <Input id="password" placeholder="password" className="w-80" />
              </div>
              <Button className="mb-2 w-full md:mb-4">SIGN IN</Button>
              <div className="flex justify-center items-center">
                <div className="space-y-1">OR</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button variant="outline" className="w-full mb-2">
                Sign in With Google
              </Button>
              <Button variant="outline" className="w-full">
                Sign in With FaceBook
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="h-4/6">
            <CardHeader className="flex justify-center items-center mb-2">
              <CardTitle>REGISTER</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 md:mb-6">
                <Label htmlFor="username">USERNAME</Label>
                <Input id="username" placeholder="username" className="w-80" />
              </div>
              <div className="space-y-1 md:mb-6">
                <Label htmlFor="password">PASSWORD</Label>
                <Input id="password" placeholder="password" className="w-80" />
              </div>
              <div className="space-y-1 md:mb-6">
                <Label htmlFor="email">EMAIL</Label>
                <Input
                  id="email"
                  placeholder="yourEmail@example.com"
                  className="w-80"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">SIGN IN</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="fixed z-[15] w-screen h-screen bg-[rgba(0,0,0,0.6)]"></div>
    </div>
  );
}
