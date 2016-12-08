package tests_selenium;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class MainTests {
	
	
	/*********************
	 **AUXILIARY METHODS**
	 *********************/
	
	private static boolean checkFields(String[] infos, String html){
		for (int i=0; i<infos.length; i++){
			if (!html.contains(infos[i])){
				System.out.println("Popover number " + i + " does not contain information " + infos[i] + ".");
				return false;
			}
		}
		return true;
	}
	
	private static String extractName(String html) {
		int index = getIndex(html, "data-original-title");
		int pos = index + "data-original-title".length() + 2;

		return html.substring(pos, html.length() - 2);
	}

	private static int getIndex(String source, String word){
		return source.indexOf(word);
	}
	
	private static String addQuotes(String line){
		ArrayList<Integer> indexes = new ArrayList<Integer>();
		int current  = line.indexOf('\\');
		while(current >= 0){
			indexes.add(current);
			current = line.indexOf('\\', current+1);
		}
		
		String ret = "";
		int ind = 0;
		for(int i : indexes){
			ret = ret.concat(line.substring(ind, i) + "\"" + line.substring(i, i+2) + "\"");
			ind = i+2;
		}
		ret = ret.concat(line.substring(ind));
		
		return ret;
	}
	
	/**
	 * Given a CSV file corresponding to the politicians database,
	 * reads it and returns a boolean to check if everything  went well.
	 * 
	 * @return true if no problem encountered while reading the CSV DB, false otherwise.
	 */
	/*private static boolean readCSVDB(String csvFile){
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = "\",\"";

        try {

            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
            	String modifiedLine = addQuotes(line);
                // use comma as separator
            	
                String[] fields = modifiedLine.split(cvsSplitBy);
                
                // Test first that the correct number of fields are there
        		if(fields.length != 9){
        			System.out.println(fields.length);
        			System.out.println("Wrong number of fields in the CSV file");
        			System.out.println(modifiedLine);
        			return false;
        		}
        		        		
        		if(modifiedLine.charAt(0) != '"' || modifiedLine.charAt(modifiedLine.length()-1)!='"' ){
    				System.out.println(modifiedLine);
    				System.out.println("Chat at first :" + modifiedLine.charAt(0));
    				System.out.println("Chat at last :" + modifiedLine.charAt(modifiedLine.length()-1));
        			System.out.println("Wrong format of a field in the CSV file");
        			return false;
        		}
        	
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        
        return true;
	}
	*/
	
	/***************
	 **MAIN METHOD**
	 ***************/
	
    public static void main(String[] args) {
        // Create a new instance of the Firefox driver
        // Notice that the remainder of the code relies on the interface, 
        // not the implementation.
    	System.setProperty("webdriver.chrome.driver", args[0]);
    	
    	String[] rudy = {"Rudy", "Government of the Federation Wallonia-Brussels", "PS", "Tournai", "53 years old", "http://directory.wecitizens.be/fr/politician/RudyDemotte-234", "http://directory.wecitizens.be/images/generic/politician-thumb/173.jpg"};
    	String[] marie = {"Marie", "Unknown post", "PS", "Bruxelles", "49 years old", "http://directory.wecitizens.be/fr/politician/MarieArena-455", "http://directory.wecitizens.be/images/generic/politician-thumb/385.jpg"};
    	String[] elio = {"Elio", "Chair of a party", "PS", "Mons", "65 years old", "http://directory.wecitizens.be/fr/politician/ElioDi-Rupo-217", "http://directory.wecitizens.be/images/generic/politician-thumb/156.jpg"};
    	String[] paul = {"Paul", "Walloon Government","PS", "Charleroi", "45 years old", "http://directory.wecitizens.be/fr/politician/PaulMagnette-465", "http://directory.wecitizens.be/images/generic/politician-thumb/395.jpg"}; 
    	String[] pol = {"Axel", "Flemish Parliament", "N-VA", "Brugge", "35 years old", "http://directory.wecitizens.be/fr/politician/AxelRonse-1777","http://directory.wecitizens.be/images/generic/politician-thumb/1519.jpg", "Pol", "Unknown post", "PVDA-PTB", "Unknown city","Unknown age", "http://directory.wecitizens.be/fr/politician/PolRonse-2697", "http://directory.wecitizens.be/images/img-no-photo.png"};
    	HashMap<String, String[]> names = new HashMap<String, String[]>();
     	names.put("Rudy Demotte", rudy);
     	names.put("Marie Arena", marie);
     	names.put("Elio Di Rupo", elio);
     	names.put("Paul Magnette", paul);
     	names.put("Politicians found", pol);
        
        File file = new File(args[1]);
        ChromeOptions options = new ChromeOptions();
        options.addExtensions(file);
        //options.addArguments("--allow-file-access-from-files"); 
        
        WebDriver driver = new ChromeDriver(options);
        
        // Get first on WeCitizens.be to download the database
        driver.get("http://www.wecitizens.be/");
        // Opens the Wikipedia page of Rudy Demotte, in english, stored on 01/12/16.
        String dir = args[2];
        driver.get("file:///" + dir + "/rudy_demotte_wiki.html");
        //driver.get("https://en.wikipedia.org/wiki/Rudy_Demotte");
        
        try {
        	driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        } catch(TimeoutException e){
        	System.out.println("Test page loading too long");
        	System.err.println(e);
        	driver.quit();
        	System.exit(-1);
        }
        
        try{
        	Thread.sleep(3000);
        } catch(InterruptedException e){
        	Thread.currentThread().interrupt();
        }
        
        System.out.println("-----------------------------------");
        System.out.println();
        System.out.println("Lauching tests...");
        System.out.println();
        
        List<WebElement> list = driver.findElements(By.xpath("//*[contains(@id, 'popoverWeCitizens')]"));
        
        
        // First Test: test if the correct number of each
        // politician are found (3 times Rudy Demotte,
        // 2 times Paul Magnette etc..)
        
        int demotte = 0;
        int ronse = 0;
        int magnette = 0;
        int arena = 0;
        int dirupo = 0;
        
        Iterator<WebElement> iter1 = list.iterator();
        while(iter1.hasNext()){
        	WebElement elem = iter1.next();
        	String html = elem.getAttribute("innerHTML");
        	if(html.contains("Demotte")){ demotte++; }
        	else if(html.contains("Ronse")){ ronse++; }
        	else if(html.contains("Magnette")){ magnette ++; }
        	else if(html.contains("Arena")){ arena++; }
        	else if(html.contains("Di Rupo")){ dirupo++; }
        }
        
        if(list.size()!=17){
        	System.out.println("Wrong number of different names of politicians found. (" + list.size() + "/17)");
        }
        else{
        	System.out.println("First test passed! (politicians found : 17/17)");
        }
        System.out.println("Rudy Demotte : " + demotte + "/7");
    	System.out.println("Ronse : " + ronse + "/3");
    	System.out.println("Elio Di Rupo : " + dirupo + "/3");
    	System.out.println("Marie Arena : " + arena + "/2");
    	System.out.println("Paul Magnette : " + magnette + "/2");
    	System.out.println();
    	System.out.println("-----------------------------------");
    	System.out.println();
        
    	
        // Second Test : test if, after having clicked on an icon, the infos in each popover are correct
        // (correct function, name, link to PolDir etc.)
    	
    	ArrayList<String> wrongResults = new ArrayList();
    	
        Iterator<WebElement> iter2 = list.iterator();
        while(iter2.hasNext()){
        	WebElement elem = iter2.next();
        	String html = elem.getAttribute("innerHTML");
        	String current = extractName(html);
        	if (!checkFields(names.get(current), html)){
        		wrongResults.add(current);
        	}
        }
        if(wrongResults.isEmpty()){
        	System.out.println("Second test passed! Information displayed in each popover are correct.");
        } else{
        	System.out.println("Wrong infos displayed in the popover for :");
        	for(String res : wrongResults){
        		if(res.equals("Politicians found")){
        			System.out.println("Ronse");
        		}
        		System.out.println(res);
        	}
        }
        System.out.println();
    	System.out.println("-----------------------------------");
    	System.out.println();
        
        // Third Test : test the politicians below are spotted in the correct order
        // (tests manually their expected position)
    	boolean passed3 = true;
        int count = 0;
        Iterator<WebElement> iter3 = list.iterator();
        while(iter3.hasNext()){
        	WebElement elem = iter3.next();
        	String html = elem.getAttribute("innerHTML");
        	if(count == 0){	// Rudy Demotte supposed to be the first one spotted
        		if(!html.contains("Demotte")){
        			passed3 = false;
        			System.out.println("The first politician found is supposed to be Rudy Demotte.");
        		} else {
        			System.out.println("The first politician found is Rudy Demotte.");
        		}
        	}
        	if(count==2){ // Marie Arena supposed to be the sixth one spotted
        		if(!html.contains("Arena")){
        			passed3 = false;
        			System.out.println("The third politician found is supposed to be Marie Arena.");
        		} else {
        			System.out.println("The third politician found is Marie Arena.");
        		}
        	}
        	if(count==5){ // Ronse supposed to be the sixth one spotted
        		if(!html.contains("Ronse")){
        			passed3 = false;
        			System.out.println("The sixth politician found is supposed to be Ronse.");
        		} else {
        			System.out.println("The sixth politician found is Ronse.");
        		}
        	}
        	if(count==8){ // Elio Di Rupo supposed to be the ninth one spotted
        		if(!html.contains("Di Rupo")){
        			passed3 = false;
        			System.out.println("The ninth politician found is supposed to be Elio Di Rupo.");
        		} else {
        			System.out.println("The ninth politician found is Elio Di Rupo.");
        		}
        	}
        	if(count==13){ // Paul Magnette supposed to be the fourteenth one spotted
        		if(!html.contains("Magnette")){
        			passed3 = false;
        			System.out.println("The fourteenth politician found is supposed to be Paul Magnette.");
        		} else {
        			System.out.println("The fourteenth politician found is Paul Magnette.");
        		}
        	}
        	count++;
        }
        if(passed3){
        	System.out.println("Third test passed!");
        } else{
        	System.out.println("Third test failed...");
        }
        System.out.println();
    	System.out.println("-----------------------------------");
    	System.out.println();
        
       /* Fourth test : tests if the database in CSV format has the correct
        * fields (if they are at the right place, if the data types are the
        * ones we expected and if there are the correct number of fields).
        */
        /*String fileName = "temp_database.csv";
        
        if(!readCSVDB("src/tests_selenium/temp_database.csv")){
        	System.out.println("Something is wrong in the CSV file corresponding to politicians' database");
        }*/
        
        System.out.println("Finished to run the tests, closing the browser...");
        //Close the browser when tests are finished
        driver.quit();
        System.out.println("Browser closed!");
    }
}