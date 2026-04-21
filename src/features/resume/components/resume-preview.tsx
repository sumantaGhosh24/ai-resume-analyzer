"use client";

import {formatDistanceToNowStrict} from "date-fns";

import {PrimaryBadge} from "@/components/primary-badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";

import {useSuspenseResume} from "../hooks/use-resume";

interface ResumePreviewProps {
  resumeId: string;
}

const ResumePreview = ({resumeId}: ResumePreviewProps) => {
  const {data: resume} = useSuspenseResume(resumeId);

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <div className="text-xs text-muted-foreground break-all font-mono">
          {resume.fileName}
        </div>
        <div className="flex text-xs text-muted-foreground gap-2 mt-1">
          <span>
            Uploaded:{" "}
            {resume.createdAt
              ? formatDistanceToNowStrict(resume.createdAt, {
                  addSuffix: true,
                })
              : "N/A"}
          </span>
          <span>·</span>
          <span>
            Updated:{" "}
            {resume.updatedAt
              ? formatDistanceToNowStrict(resume.updatedAt, {
                  addSuffix: true,
                })
              : "N/A"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {resume.fileUrl ? (
          <iframe
            src={resume.fileUrl}
            title="Resume PDF Preview"
            className="w-full h-[650px] rounded border bg-background"
          />
        ) : (
          <p className="text-center text-muted-foreground pt-8">
            No preview available
          </p>
        )}
        <Tabs defaultValue="skills" className="mt-5">
          <TabsList className="flex-wrap mb-10">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="educations">Educations</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <div className="mt-2 flex flex-wrap gap-2">
              {resume.skills.length > 0 ? (
                resume.skills.map((skill) => (
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
            {resume.experiences.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <ul className="space-y-6">
                  {resume.experiences.map((exp) => (
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
                        {exp.years && (
                          <span className="text-muted-foreground text-xs mt-1 md:mt-0">
                            {exp.years} {exp.years === 1 ? "year" : "years"}
                          </span>
                        )}
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
            {resume.projects && resume.projects.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {resume.projects.map((project) => (
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
          <TabsContent value="educations">
            {resume.education.length > 0 ? (
              <ul className="space-y-4">
                {resume.education.map((edu) => (
                  <li
                    key={edu.id}
                    className="border-b pb-3 last:border-b-0 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <span className="font-medium text-foreground block">
                        {edu.degree}
                      </span>
                      <span className="text-muted-foreground text-sm block">
                        {edu.institute}
                      </span>
                    </div>
                    <span className="text-xs text-right mt-2 md:mt-0 text-muted-foreground whitespace-nowrap">
                      {edu.year}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground pt-8">
                No educations available
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
