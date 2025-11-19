
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Build Your Dream Team with BizHR
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our all-in-one HR platform simplifies recruitment, onboarding, and employee management. Focus on what matters most: growing your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/jobs">
                    <Button size="lg">
                      View Open Positions
                    </Button>
                  </Link>
                  <Link href="/login">
                     <Button size="lg" variant="secondary">
                        Employee Login
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/rocket/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="teamwork collaboration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to manage your HR</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From finding the right candidates to managing payroll, we've got you covered. Our intuitive platform makes HR management a breeze.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Recruitment</h3>
                <p className="text-muted-foreground">Streamline your hiring process with our powerful recruitment tools.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Employee Management</h3>
                <p className="text-muted-foreground">Keep track of all your employee data in one secure place.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Payroll</h3>
                <p className="text-muted-foreground">Automate payroll and ensure your team gets paid on time, every time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 md:p-8 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 BizHR. All rights reserved.</p>
      </footer>
    </div>
  );
}
