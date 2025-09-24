cmake_minimum_required(VERSION 3.22.1)
project(MyAppModules)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(MyAppModules SHARED MyAppModules.cpp)

find_library(log-lib log)

target_link_libraries(MyAppModules ${log-lib})


