import {
  preferences,
  preferenceScript,
  preferenceStyles,
} from "@/lib/preferences";

export function PreferenceHead() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: preferenceScript(preferences) }}
      />
      <style
        dangerouslySetInnerHTML={{ __html: preferenceStyles(preferences) }}
      />
    </>
  );
}
