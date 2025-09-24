#include <jni.h>
#include <android/log.h>
extern "C"
JNIEXPORT void JNICALL
Java_com_sahojogita_social_MainApplication_nativeInit(JNIEnv *env, jobject thiz, jlong jsiPtr)
 {
  __android_log_print(ANDROID_LOG_INFO, "MyAppModules", "NativeInit Called"); 
  } 