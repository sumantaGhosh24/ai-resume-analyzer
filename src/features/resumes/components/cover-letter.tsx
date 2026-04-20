"use client";

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {
  CoverLetter as CoverLetterTypes,
  CoverLetterParagraph,
} from "@/generated/prisma/client";

interface CoverLetterProps extends CoverLetterTypes {
  body: CoverLetterParagraph[];
}

const CoverLetter = ({coverLetter}: {coverLetter: CoverLetterProps}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>Cover Letter</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
        <div className="space-y-4">
          <h2 className="font-bold text-lg">{coverLetter.title}</h2>
          <p>
            <span className="font-semibold">Greeting:</span>{" "}
            {coverLetter.greeting}
          </p>
          <p>
            <span className="font-semibold">Introduction:</span>{" "}
            {coverLetter.intro}
          </p>
          <div>
            <span className="font-semibold block mb-2">Body:</span>
            <div className="space-y-2">
              {coverLetter.body && coverLetter.body.length > 0 ? (
                [...coverLetter.body]
                  .sort((a, b) => a.order - b.order)
                  .map((para) => (
                    <p key={para.id} className="pl-2 border-l-2 border-muted">
                      {para.content}
                    </p>
                  ))
              ) : (
                <p className="text-muted-foreground italic">
                  No body paragraphs available.
                </p>
              )}
            </div>
          </div>
          <p>
            <span className="font-semibold">Closing:</span>{" "}
            {coverLetter.closing}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetter;
