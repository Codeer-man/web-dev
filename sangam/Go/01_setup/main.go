package main

import (
	"fmt"
	"math"
	"strings"
)



func main(){
	fmt.Println(("hello go"))
	// variables 
	//  format : var name type
	var mane string ;
	mane = "footballer"

	var year int = 2005;

	fmt.Println("mane",mane,"year:",year);

	//math
	fmt.Println("Sqr 35:", math.Sqrt(35));

	// short declare 
	leaner := "mainsh";

	learning , year := "gogoanime" ,34 ;

	fmt.Println(learning,leaner)

	// types
	firstName ,lastmane := "Manish","Manandhar";
	fullName := firstName+" "+lastmane
	fmt.Println(strings.ToUpper(fullName))

	age:=26

	if age>=18 {
		fmt.Println("Alligible")
	}else if age >= 80 {
		fmt.Println("Too old")
	}else {
		fmt.Println("You are a child")
	}

}