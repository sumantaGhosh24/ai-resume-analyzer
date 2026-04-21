"use client";

import {PrimaryBadge} from "@/components/primary-badge";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
  RewrittenResume as RewrittenTypes,
  RewrittenSkill,
} from "@/generated/prisma/client";

interface RewrittenResumeProps extends RewrittenTypes {
  experiences: {
    id: string;
    title: string;
    company: string;
    bullets: {
      id: string;
      content: string;
    }[];
  }[];
  projects: {
    id: string;
    name: string;
    bullets: {
      id: string;
      content: string;
    }[];
  }[];
  skills: RewrittenSkill[];
}

const RewrittenResume = ({rewritten}: {rewritten: RewrittenResumeProps}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>Resume Rewrite</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
        <p>{rewritten?.summary}</p>
        <Tabs defaultValue="skills" className="mt-5">
          <TabsList className="flex-wrap">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <div className="mt-2 flex flex-wrap gap-2">
              {rewritten?.skills.length > 0 ? (
                rewritten?.skills.map((skill) => (
                  <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                ))
              ) : (
                <p className="text-center text-muted-foreground pt-8">
                  No skills available
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="experiences">
            {rewritten?.experiences.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <ul className="space-y-6">
                  {rewritten?.experiences.map((exp) => (
                    <li key={exp.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <span className="font-medium text-foreground text-base block">
                            {exp.title}
                          </span>
                          <span className="text-muted-foreground text-sm block">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2 space-y-1">
                          {exp.bullets.map((bullet) => (
                            <li key={bullet.id} className="leading-relaxed">
                              {bullet.content}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-center text-muted-foreground pt-8">
                No experiences available
              </p>
            )}
          </TabsContent>
          <TabsContent value="projects">
            {rewritten?.projects.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {rewritten?.projects.map((project) => (
                    <li
                      key={project.id}
                      className="border-b pb-3 last:border-b-0"
                    >
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-foreground text-base">
                          {project.name}
                        </span>
                      </div>
                      {project.bullets && project.bullets.length > 0 && (
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {project.bullets.map((bullet) => (
                            <li key={bullet.id} className="leading-relaxed">
                              {bullet.content}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-center text-muted-foreground pt-8">
                No projects available
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RewrittenResume;
